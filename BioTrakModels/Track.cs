using System;
using System.Collections.Generic;

namespace BioTrakModels
{
    public class Track
    {
        public DateTime? issuedAt { get; set; }
        public DateTime? expiration { get; set; }
        public int id { get; set; }
        public string type { get; set; }
        public string batchCode { get; set; }
        public bool? available { get; set; }
        public string name { get; set; }
        public bool published { get; set; }
        public bool chained { get; set; }
        public List<object> inputs { get; set; }
        public List<int> outputs { get; set; }
        public List<Track> supplyChain { get; set; }

    }
}