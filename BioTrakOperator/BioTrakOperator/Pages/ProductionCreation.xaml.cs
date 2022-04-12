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
    public partial class ProductionCreation : ContentPage
    {
        public ProductionCreation()
        {
            InitializeComponent();
        }

        private void CheckBox_CheckedChanged(object sender, CheckedChangedEventArgs e)
        {
            ProductionCode.IsVisible = ((CheckBox)sender).IsChecked;
            
        }


        private void CreateNewProduction(object sender, EventArgs e)
        {

        }
    }
}