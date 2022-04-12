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
    public partial class TrackDisplayItem : ContentView
    {
        public TrackDisplayItem()
        {
            InitializeComponent();
        }

        public TrackDisplayItem(String name)
        {
            InitializeComponent();
            lbl.Text = name;
        }

    }

}