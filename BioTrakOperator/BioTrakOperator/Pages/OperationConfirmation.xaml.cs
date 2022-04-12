using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BioTrakOperator.Models;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace BioTrakOperator.Pages
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class OperationConfirmation : ContentPage
    {
        Settings settings;
        public OperationConfirmation()
        {
            InitializeComponent();
        }

        public OperationConfirmation(Settings settings)
        {
            InitializeComponent();
            this.settings = settings;
            lblOperation.Text = settings.ConfiramtionText;
        }

     

        private void ConfirmOperation(object sender, EventArgs e)
        {
            Navigation.PopAsync();
        }
    }
}