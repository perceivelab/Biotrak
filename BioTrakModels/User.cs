using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BioTrakModels
{
    public class User
    {
        public String SessionID;
        public string username { get; set; }
        public string tenant { get; set; }
        public string displayName { get; set; }
        public List<UserType> roles { get; set; }
        public List<string> privileges { get; set; }


        public bool HasAcceptanceCapability { get { return true; } }
        public bool HasProductionCapability
        {
            get { try { return roles[0] == UserType.ANIMAL_FEED || roles[0] == UserType.BREEDING || roles[0] == UserType.DAIRY_FACTORY || roles[0] == UserType.OIL_MILL || roles[0] == UserType.SLAUGHTER_HOUSE; } catch { return false; } }
        }

        public bool IsTransport { get { return roles[0] == UserType.GENERIC_TRANSPORT; } }
    }
}
