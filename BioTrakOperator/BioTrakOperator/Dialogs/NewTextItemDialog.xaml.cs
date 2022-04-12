using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace BioTrakOperator.Dialogs
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class NewTextItemDialog : ContentPage
    {
        public delegate void AddSerial(String serial);
        public event AddSerial NewSerialAdded;

        public NewTextItemDialog()
        {
            InitializeComponent();
        }

        private void Button_Clicked(object sender, EventArgs e)
        {
            NewSerialAdded(txtSerial.Text);
        }
    }
}