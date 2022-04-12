using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BioTrakModels
{
    public enum UserType
    {
        PUBLIC = 0,
        ADMIN,
        ANIMAL_FEED,
        BREEDING,
        SLAUGHTER_HOUSE,
        GENERIC_SUPPLIER,
        GENERIC_TRANSPORT,
        DAIRY_FACTORY,
        OIL_MILL


    }

    public enum TRACKSTATE
    {
        INBOUND_LOGISTICS = 0, PRODUCTION_START, PRODUCTION_COMPLETE, PRODUCTION_EXCEPTION, TRANSPORT_START, TRANSPORT_EXCEPTION
    }

    public enum Operations
    {
        TRACE = 0,
        CREATE_PRODUCTION,
        OPENSACK,
        CLOSESACK,
        BOXRECEIVED,
        BOXDELIVERED,
        LOGOUT = 99
    }
}
