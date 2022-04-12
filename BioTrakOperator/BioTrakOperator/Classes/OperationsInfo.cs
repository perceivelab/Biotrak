using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace BioTrakOperator.Classes
{
    public class OperationsInfo : INotifyPropertyChanged
    {
        private string opName;
        

        public string OperationName
        {
            get { return opName; }
            set
            {
                opName = value;
                OnPropertyChanged("OperationName");
            }
        }

      
        public event PropertyChangedEventHandler PropertyChanged;

        public void OnPropertyChanged(string name)
        {
            if (this.PropertyChanged != null)
                this.PropertyChanged(this, new PropertyChangedEventArgs(name));
        }



    }
}
