using BioTrakModels;
using BioTrakServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace BioTrakDesktop
{
    /// <summary>
    /// Interaction logic for Login.xaml
    /// </summary>
    public partial class Login : Window
    {
        public delegate void LogIn(User u);
        public event LogIn LoggedIn;
        public Login()
        {
            InitializeComponent();
           
        }

        private async void LoginUser(object sender, EventArgs e)
        {
            User user = await ServerInterface.LoginUser(txtUser.Text, txtPassword.Text);
            //App.SetUser(user);
            if (user == null) return;
        }

        public void LoadUser(User u)
        {

        }

        private void TextBox_GotFocus(object sender, RoutedEventArgs e)
        {

        }

        private void TextBox_LostFocus(object sender, RoutedEventArgs e)
        {

        }
    }
}
