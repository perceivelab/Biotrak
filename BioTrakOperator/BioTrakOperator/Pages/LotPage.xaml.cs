using Android.Widget;
using BioTrakModels;
using BioTrakOperator.Dialogs;
using BioTrakOperator.Models;
using BioTrakServices;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace BioTrakOperator.Pages
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class LotPage : ContentPage
    {
        private User user;
        private Track track;
        private bool editing = false;

        public delegate void LotTerminate(String s);
        public event LotTerminate LotTerminated;

        public delegate void LotAdd(Track t);
        public event LotAdd LotAdded;

        public delegate void LotUpdate(Track t);
        public event LotUpdate LotUpdated;

        public ObservableCollection<TrackItem> Items { get; set; }

        public LotPage()
        {
            InitializeComponent();
        }

        public LotPage(User user, bool tracing, Track track= null)
        {
            InitializeComponent();
            this.user = user;
            Items = new ObservableCollection<TrackItem>();
            BindingContext = this;
            this.track = track;
            if (track != null)
            {
                if (!tracing)
                {
                    btnSave.Text = "Aggiorna";
                    btnTerminate.IsVisible = true;
                }
                else
                {
                    btnSave.IsVisible = false;
                }
                txtIDLot.IsReadOnly = true;
                txtNameLot.IsReadOnly = true;
                editing = true;
                Populate();
            }

        }

        private async Task Populate()
        {
            txtIDLot.Text = track.id.ToString();
            txtNameLot.Text = track.name;
            foreach(Track t in track.supplyChain)
            {
                Items.Add(new TrackItem(t));

            }

        }

        private async void AddNewItem(object sender, EventArgs e)
        {
            AddNewItemDialog anid = new AddNewItemDialog();
            anid.AddingTextItem += AddNewSerialObject;
            anid.AddingPhotoItem += AddNewPhotoObject;
            await Navigation.PushModalAsync(anid);
            

        }

        private async void AddNewSerialObject()
        {
            Navigation.PopModalAsync();
            NewTextItemDialog ntid = new NewTextItemDialog();
            ntid.NewSerialAdded += Ntid_NewSerialAdded;
            await Navigation.PushModalAsync(ntid);
           

        }

        private async void Ntid_NewSerialAdded(string serial)
        {
            Items.Add(new TrackItem(serial));
            await Navigation.PopModalAsync();
        }

        private async void AddNewPhotoObject()
        {
            await Navigation.PopModalAsync();
            ScannerPage sp = new ScannerPage();
            sp.CodeScanned += Sp_CodeScanned;
            await Navigation.PushModalAsync(sp);
        }

        private async void Sp_CodeScanned(string serial)
        {
            if(serial.StartsWith("biotrak:"))
            {
                Track t = await ServerInterface.GetTreeForItemID(user,serial.Replace("biotrak:",""));
                Items.Add(new TrackItem(t.name,t.id));
            }
            else
            {
                Items.Add(new TrackItem(serial));
            }
            await Navigation.PopModalAsync();

        }

        private async void SaveItem(object sender, EventArgs e)
        {
            List<object> items = new List<object>();
            
            foreach(TrackItem ti in Items)
            {
                if(ti.ID!=-1)
                {
                    items.Add(ti.ID);

                }
                else
                {
                    items.Add(ti.Name);
                }
            }
            
            
            Track t = await ServerInterface.AddOrUpdateTrack(user, txtNameLot.Text, txtIDLot.Text, items, editing);
            if (t == null)
            {
                Toast.MakeText(Android.App.Application.Context, "C'e' stato un errore durante l'inserimento", ToastLength.Short).Show();
            }
            else
            {
                if (!editing) LotAdded(t);
                else LotUpdated(t);
            }
            await Navigation.PopModalAsync();
        }

        private async void TerminateItem(object sender, EventArgs e)
        {
            await ServerInterface.TerminateTrack(user, txtIDLot.Text);
            LotTerminated(txtIDLot.Text);
            await Navigation.PopModalAsync();
        }
    }
}