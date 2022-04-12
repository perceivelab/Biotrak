using BioTrakModels;
using BioTrakOperator.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace BioTrakOperator.Pages
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class ShowLotPage : ContentPage
    {
        int ID;
        public ShowLotPage()
        {
            InitializeComponent();
        }

        public ShowLotPage(User u, int ID)
        {
            InitializeComponent();
            this.ID = ID;
            lblLot.Text = "Lotto " + ID;
        }
    }
}