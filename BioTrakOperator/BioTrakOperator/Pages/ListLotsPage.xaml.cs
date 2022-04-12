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
    public partial class ListLotsPage : ContentPage
    {
        private User user;
        private Dictionary<String, Button> _buttons = new Dictionary<string, Button>();
        public ListLotsPage()
        {
            InitializeComponent();
        }
        private Button GetButton(String text)
        {
            return new Button() { Text = text , VerticalOptions = LayoutOptions.Center, HorizontalOptions = LayoutOptions.CenterAndExpand, BackgroundColor = Color.Transparent, FontSize = 20, BorderColor = Color.FromHex("#2196F3"), TextColor = Color.FromHex("#2196F3"), CornerRadius = 10, BorderWidth = 2 , WidthRequest = 300};
        }

        public ListLotsPage(User user)
        {
            InitializeComponent();
            this.user = user;
            Button addNewLot = GetButton("Inserisci nuova produzione");
            addNewLot.BackgroundColor = Color.FromHex("#2196F3");
            addNewLot.TextColor = Color.White;
            addNewLot.Margin = new Thickness(0, 20, 0, 0);
            NavigationPage.SetHasNavigationBar(this, false);
            addNewLot.Clicked += AddNewLot_Clicked;
            pnlLots.Children.Add(addNewLot);
            GetTracks();
            
        }
        private async Task GetTracks()
        {
            List<Track> tracks = await ServerInterface.GetTracks(user,TRACKSTATE.PRODUCTION_START);
            tracks = tracks.OrderByDescending(a => a.issuedAt).ToList();
            foreach(Track t in tracks)
            {
                if (t.available == false) continue;
                Button addNewLot = GetButton("Produzione " + (String.IsNullOrEmpty(t.name) ? t.id.ToString() : t.name));
                
                addNewLot.Clicked += ShowLot; 
                addNewLot.ClassId = t.id.ToString();
                pnlLots.Children.Add(addNewLot);
                _buttons.Add(t.id.ToString(),addNewLot);
            }
        }

        private async void ShowLot(object sender, EventArgs e)
        {
            String item = ((Button)sender).ClassId;
            Track t = await ServerInterface.GetTreeForItemID(user,item);
            LotPage lt = new LotPage(user, false ,t) ;
            lt.LotTerminated += Lt_LotTerminated;
            lt.LotUpdated += Lt_LotUpdated;
            await Navigation.PushModalAsync(lt);
        }

        private void Lt_LotUpdated(Track t)
        {
            _buttons[t.id.ToString()].Text = t.name;
        }

        private void Lt_LotTerminated(string s)
        {
            pnlLots.Children.Remove(_buttons[s]);
            _buttons.Remove(s);
        }

        private async void AddNewLot_Clicked(object sender, EventArgs e)
        {
            LotPage lp = new LotPage(user, false, null);
            lp.LotAdded += Lp_LotAdded;
            await Navigation.PushModalAsync(lp);
        }

        private void Lp_LotAdded(Track t)
        {
            Button addNewLot = GetButton("Produzione " + (String.IsNullOrEmpty(t.name) ? t.id.ToString() : t.name));
            
            addNewLot.Clicked += ShowLot;
            addNewLot.ClassId = t.id.ToString();
            pnlLots.Children.Add(addNewLot);
            _buttons.Add(t.id.ToString(), addNewLot);
        }

        private void TapGestureRecognizer_Tapped(object sender, EventArgs e)
        {
            Navigation.PopModalAsync();

        }
    }
}