using BioTrakModels;
using BioTrakOperator.Models;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace BioTrakOperator.Pages
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class OperationsPageFlyout : ContentPage
    {
        public ListView ListView;
        private User user;

        public OperationsPageFlyout()
        {
            InitializeComponent();
        }

        internal void SetUser(User user)
        {
            this.user = user;
            BindingContext = new OperationsPageFlyoutViewModel(user);
            ListView = MenuItemsListView;
        }

        private class OperationsPageFlyoutViewModel : INotifyPropertyChanged
        {
            public ObservableCollection<OperationsPageFlyoutMenuItem> MenuItems { get; set; }

            public OperationsPageFlyoutViewModel(User user)
            {
                MenuItems = new ObservableCollection<OperationsPageFlyoutMenuItem>();
                switch (user.roles[0])
                {
                    case UserType.ANIMAL_FEED:
                        MenuItems.Add(new OperationsPageFlyoutMenuItem { Settings = Utils.GetSettingsForOperation(Operations.CREATE_PRODUCTION) });
                        MenuItems.Add(new OperationsPageFlyoutMenuItem { Settings = Utils.GetSettingsForOperation(Operations.OPENSACK)});
                        MenuItems.Add(new OperationsPageFlyoutMenuItem { Settings = Utils.GetSettingsForOperation(Operations.CLOSESACK)});
                        MenuItems.Add(new OperationsPageFlyoutMenuItem { Settings = Utils.GetSettingsForOperation(Operations.LOGOUT)});
                        break;
                    case UserType.GENERIC_SUPPLIER:
                        MenuItems.Add(new OperationsPageFlyoutMenuItem { Settings = Utils.GetSettingsForOperation(Operations.BOXRECEIVED)});
                        MenuItems.Add(new OperationsPageFlyoutMenuItem { Settings = Utils.GetSettingsForOperation(Operations.BOXDELIVERED)});
                        MenuItems.Add(new OperationsPageFlyoutMenuItem { Settings = Utils.GetSettingsForOperation(Operations.LOGOUT)});
                        break;
                    case UserType.SLAUGHTER_HOUSE:
                        MenuItems.Add(new OperationsPageFlyoutMenuItem { Settings = Utils.GetSettingsForOperation(Operations.CREATE_PRODUCTION) });
                        break;
                    case UserType.DAIRY_FACTORY:
                        MenuItems.Add(new OperationsPageFlyoutMenuItem { Settings = Utils.GetSettingsForOperation(Operations.CREATE_PRODUCTION) });
                        break;

                    case UserType.OIL_MILL:
                        MenuItems.Add(new OperationsPageFlyoutMenuItem { Settings = Utils.GetSettingsForOperation(Operations.CREATE_PRODUCTION) });
                        break;
                    case UserType.PUBLIC:
                    default:
                        return;

                }   
            }

            #region INotifyPropertyChanged Implementation
            public event PropertyChangedEventHandler PropertyChanged;
            void OnPropertyChanged([CallerMemberName] string propertyName = "")
            {
                if (PropertyChanged == null)
                    return;

                PropertyChanged.Invoke(this, new PropertyChangedEventArgs(propertyName));
            }
            #endregion
        }
    }
}