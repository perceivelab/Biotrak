using BioTrakModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace BioTrakOperator.Models
{
    public class Settings
    {
        public Operations Operation { get; set; }
        public String Title { get; set; }
        public String ConfiramtionText { get; set; }
        public Object Parent { get; set; }
        public Type TargetType { get; set; }
        public Type NextTargetType { get; set; }

    }
}
