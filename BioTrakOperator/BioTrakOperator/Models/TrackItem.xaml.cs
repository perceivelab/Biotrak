using BioTrakModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace BioTrakOperator.Models
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class TrackItem : ViewCell
    {
        private string serial;

        public int ID;
        private Track t;

        public String Name { get { return serial; } }

        public TrackItem()
        {
            InitializeComponent();
        }

        public TrackItem(string serial, int id = -1)
        {
            InitializeComponent();
            this.serial = serial;
            ID = id;
        }

        public TrackItem(Track t)
        {
            InitializeComponent();
            this.t = t;
            ID = t.id;
            serial = t.name!=null?t.name:t.batchCode;
        }

        private void DeleteItemFromTrack(object sender, EventArgs e)
        {
            
        }
    }
}