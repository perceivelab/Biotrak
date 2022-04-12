using BioTrakModels;
using BioTrakOperator.Classes;
using BioTrakOperator.Models;
using BioTrakServices;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace BioTrakOperator.Pages
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class ListOperationsPage : ContentPage
    {
        private User user;
        public ObservableCollection<OperationsInfo> OperationsInformation { get; set; }
        public ListOperationsPage()
        {
            InitializeComponent();
            NavigationPage.SetHasNavigationBar(this, false);

        }

        public ListOperationsPage(User user)
        {
            InitializeComponent();
            OperationsInformation = new ObservableCollection<OperationsInfo>();
            
            this.user = user;
            btnAcceptance.IsVisible = user.HasAcceptanceCapability;
            btnLots.IsVisible = user.HasProductionCapability;
        }

        private async void ShowLots(object sender, EventArgs e)
        {
            await Navigation.PushModalAsync(new ListLotsPage(user));
        }

        private async void AcceptProducts(object sender, EventArgs e)
        {
            ScannerPage sp = new ScannerPage();
            sp.CodeScanned += Sp_CodeScanned;
            await Navigation.PushModalAsync(sp);
        }

        private async void Sp_CodeScanned(string serial)
        {
            await ServerInterface.AcceptProduct(user,serial);
            Navigation.PopModalAsync();
        }
    }

    public class OperationsInfoRepository
    {
        private ObservableCollection<OperationsInfo> opInfo;

        #region Properties

        public ObservableCollection<OperationsInfo> OperationInfo
        {
            get { return opInfo; }
            set { this.opInfo = value; }
        }

        public OperationsInfoRepository()
        {
            OperationInfo.Add(new OperationsInfo() { OperationName = "Produzioni" });
            OperationInfo.Add(new OperationsInfo() { OperationName = "Accettazione" });
        }

        #endregion


    }

}