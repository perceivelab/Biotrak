using BioTrakModels;
using System;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace BioTrakOperator
{
    public partial class App : Application
    {
        private static User _user { get; set; }
        public App()
        {
            Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense("NTg2MjE4QDMxMzkyZTM0MmUzMERtaUF3QlhOVndaMzVqWUxjUVhUSW1acWJsb1dlVnFFRkdQbjlzQSt5RGs9");

            InitializeComponent();
            MainPage = new NavigationPage(new MainPage());
        }

        public static String Authorization()
        {
            return _user.SessionID;
        }

        protected override void OnStart()
        {
        }

        protected override void OnSleep()
        {
        }

        protected override void OnResume()
        {
        }

        internal static void SetUser(User user)
        {
            _user = user;
        }
    }
}
