using BioTrakModels;
using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BioTrakServices
{
    public class ServerInterface
    {
        private static string SERVER_ADDRESS = "http://198.211.110.128:8080/api/";
        private class RequestClient
        {
            public RestClient Client;
            public RestRequest Request;
            public List<String> logs = new List<string>();
            private void LogRequest(IRestRequest request, IRestResponse response, long durationMs = 0)
            {
                var requestToLog = new
                {
                    resource = request.Resource,
                    // Parameters are custom anonymous objects in order to have the parameter type as a nice string
                    // otherwise it will just show the enum value
                    parameters = request.Parameters.Select(parameter => new
                    {
                        name = parameter.Name,
                        value = parameter.Value,
                        type = parameter.Type.ToString()
                    }),
                    // ToString() here to have the method as a nice string otherwise it will just show the enum value
                    method = request.Method.ToString(),
                    // This will generate the actual Uri used in the request
                    uri = Client.BuildUri(request),
                };

                var responseToLog = new
                {
                    statusCode = response.StatusCode,
                    content = response.Content,
                    headers = response.Headers,
                    // The Uri that actually responded (could be different from the requestUri if a redirection occurred)
                    responseUri = response.ResponseUri,
                    errorMessage = response.ErrorMessage,
                };
                logs.Add(string.Format("Request completed in {0} ms, Request: {1}, Response: {2}",
                        durationMs,
                        JsonConvert.SerializeObject(requestToLog),
                        JsonConvert.SerializeObject(responseToLog)));
                Console.Out.WriteLine(string.Format("Request completed in {0} ms, Request: {1}, Response: {2}", durationMs, JsonConvert.SerializeObject(requestToLog), JsonConvert.SerializeObject(responseToLog)));


            }

            public RequestClient(Uri url, String func, Method method)
            {
                Client = new RestClient(url);
                Request = new RestRequest(func, method);

            }

            public async Task<IRestResponse> ExecuteAsync()
            {
                IRestResponse resp = null;
                resp = await Client.ExecuteAsync(Request);
                LogRequest(Request, resp);
                return resp;
            }

            public void AddHeader(string header, string val)
            {
                Request.AddHeader(header, val);
            }

            public void AddBody(object obj)
            {
                Request.AddJsonBody(obj);
            }
        }

        public static async Task AcceptProduct(User user, string id)
        {
            RequestClient _client = new RequestClient(new Uri(SERVER_ADDRESS), String.Format("tracks/{0}/{1}", id, TRACKSTATE.INBOUND_LOGISTICS), Method.PUT);
            _client.AddHeader("Authorization", user.SessionID);
            await _client.ExecuteAsync();
        }

        public static async Task<Track> GetTrack(User user, string biotrakID)
        {
            RequestClient _client = new RequestClient(new Uri(SERVER_ADDRESS), String.Format("tracks/{0}", biotrakID), Method.GET);
            _client.AddHeader("Authorization", user.SessionID);
            IRestResponse resp = await _client.ExecuteAsync();
            Track track = null;
            if (resp.IsSuccessful)
            {
                track = JsonConvert.DeserializeObject<Track>(resp.Content);
            }
            return track;
        }

        public static async Task TerminateTrack(User user, string id)
        {
            RequestClient _client = new RequestClient(new Uri(SERVER_ADDRESS), String.Format("tracks/{0}/{1}", id, TRACKSTATE.PRODUCTION_COMPLETE), Method.PUT);
            _client.AddHeader("Authorization", user.SessionID);
            await _client.ExecuteAsync();
        }

        public static async Task<Track> GetNonBiotrakTrack(User user, string biotrakID)
        {
            RequestClient _client = new RequestClient(new Uri(SERVER_ADDRESS), String.Format("tracks/{0}", biotrakID), Method.GET);
            _client.AddHeader("Authorization", user.SessionID);
            IRestResponse resp = await _client.ExecuteAsync();
            Track track = null;
            if (resp.IsSuccessful)
            {
                track = JsonConvert.DeserializeObject<Track>(resp.Content);
            }
            return track;
        }

        public static async Task<List<Track>> GetTracks(User user, TRACKSTATE state)
        {
            RequestClient _client = new RequestClient(new Uri(SERVER_ADDRESS), String.Format("tracks/search?event={0}", state.ToString()), Method.GET);
            _client.AddHeader("Authorization", user.SessionID);
            IRestResponse resp = await _client.ExecuteAsync();
            List<Track> tracks = null;
            if (resp.IsSuccessful)
            {
                tracks = JsonConvert.DeserializeObject<List<Track>>(resp.Content);
            }
            return tracks;
        }

        public static async Task<Track> AddOrUpdateTrack(User user, String name, String publicId, List<object> items, bool update)
        {
            RequestClient _client = new RequestClient(new Uri(SERVER_ADDRESS), "tracks", update ? Method.PATCH : Method.POST);
            _client.AddHeader("Authorization", user.SessionID);
            Dictionary<String, object> parameters = new Dictionary<string, object>();
            parameters.Add("name", name);
            parameters.Add("type", user.roles[0].ToString());
            parameters.Add("batchCode", publicId);
            parameters.Add("inputs", items);
            parameters.Add("event", TRACKSTATE.PRODUCTION_START.ToString());
            _client.AddBody(parameters);
            IRestResponse resp = await _client.ExecuteAsync();
            Track track = null;
            if (resp.IsSuccessful)
            {
                track = JsonConvert.DeserializeObject<Track>(resp.Content);
            }
            return track;
        }

        public static async Task<User> LoginUser(string username, string password)
        {

            RequestClient _client = new RequestClient(new Uri(SERVER_ADDRESS), "authority/login", Method.POST);
            Dictionary<String, String> parameters = new Dictionary<string, string>();
            parameters.Add("username", username);
            parameters.Add("password", password);
            _client.AddBody(parameters);
            IRestResponse resp = await _client.ExecuteAsync();

            if (resp.IsSuccessful)
            {
                User u = await GetUserInformation(resp.Content);
                if (u != null) u.SessionID = resp.Content;
                return u;
            }
            return null;
        }

        private static async Task<User> GetUserInformation(String authorization)
        {
            RequestClient _client = new RequestClient(new Uri(SERVER_ADDRESS), "authority/principal", Method.GET);
            _client.AddHeader("Authorization", authorization);
            IRestResponse resp = await _client.ExecuteAsync();

            if (resp.IsSuccessful)
            {
                return JsonConvert.DeserializeObject<User>(resp.Content);
            }
            return null;
        }

        public static async Task<Track> GetTreeForItemID(User user, string id)
        {
            RequestClient _client = new RequestClient(new Uri(SERVER_ADDRESS), String.Format("tracks/{0}/supplyChain",id), Method.GET);
            _client.AddHeader("Authorization", user.SessionID);
            IRestResponse resp = await _client.ExecuteAsync();

            if (resp.IsSuccessful)
            {
                return JsonConvert.DeserializeObject<Track>(resp.Content);
            }

            return null;
        }
    }
}