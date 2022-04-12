using System;
using System.Collections.Generic;
using System.Text;
using Xamarin.Forms;
using BioTrakOperator.Models;

namespace BioTrakOperator.Pages
{
    public class BioTrakContentPage:ContentPage
    {
        private Settings _Settings;
        public void SetSettings(Settings settings) { this._Settings = settings; }
        public Settings GetSettings() { return this._Settings; }
    }

    public class BioTrakNavigationPage : NavigationPage
    {
        private Settings _Settings;
        public void SetSettings(Settings settings) { this._Settings = settings; }
        public Settings GetSettings() { return this._Settings; }
    }

    public class BioTrakFlyoutPage : FlyoutPage
    {
        private Settings _Settings;
        public void SetSettings(Settings settings) { this._Settings = settings; }
        public Settings GetSettings() { return this._Settings; }
    }
}
