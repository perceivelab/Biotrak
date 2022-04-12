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
    public partial class OperationsPage : BioTrakFlyoutPage
    {
        private User user;

        public OperationsPage()
        {
            InitializeComponent();
            FlyoutPage.ListView.ItemSelected += ListView_ItemSelected;
        }
        public OperationsPage(User user)
        {
            InitializeComponent();
            this.user = user;
            FlyoutPage.SetUser(user);
            FlyoutPage.ListView.ItemSelected += ListView_ItemSelected;
        }
        

        private void ListView_ItemSelected(object sender, SelectedItemChangedEventArgs e)
        {
            var item = e.SelectedItem as OperationsPageFlyoutMenuItem;
            if (item == null)
                return;
            Page page = null;
            Settings settings = item.Settings;
            
        
            
            switch (settings.Operation)
            {
                case Operations.OPENSACK:
                case Operations.CLOSESACK:
                case Operations.BOXDELIVERED:
                case Operations.BOXRECEIVED:
                    page = (ScannerPage)Activator.CreateInstance(settings.TargetType);       
                    ((ScannerPage)page).SetSettings(settings);
                    break;
                case Operations.TRACE:
                    page = (ScannerPage)Activator.CreateInstance(settings.TargetType);
                    ((ScannerPage)page).SetSettings(settings);
                    break;
                
                default:
                    page = null;
                    break;
            }
             
            page.Title = settings.Title;
            
            Detail = new NavigationPage(page);
            IsPresented = false;

            FlyoutPage.ListView.SelectedItem = null;
        }

       
    }
}