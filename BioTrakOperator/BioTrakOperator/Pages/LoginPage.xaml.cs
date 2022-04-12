using BioTrakModels;
using BioTrakOperator.Models;
using BioTrakServices;
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
    public partial class LoginPage : ContentPage
    {
        String _userType;
        public LoginPage()
        {
            InitializeComponent();
        }

        private async void LoginUser(object sender, EventArgs e)
        {
            User user = await ServerInterface.LoginUser(txtUser.Text, txtPassword.Text);
            //App.SetUser(user);
            if (user == null) return;
            await Navigation.PushAsync(new ListOperationsPage(user));
            //await Navigation.PushAsync(new NavigationPage(new TrackingPage(user,"6")));

        }

       

        private void SetUser(object sender, EventArgs e)
        {
            var picker = (Picker)sender;
            int selectedIndex = picker.SelectedIndex;

            if (selectedIndex != -1)
            {
                _userType = picker.Items[selectedIndex];
            }
        }
    }
}