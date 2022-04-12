using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Threading.Tasks;
using BioTrakModels;
using BioTrakOperator.Classes;
using BioTrakOperator.Models;
using BioTrakServices;
using Syncfusion.TreeView.Engine;
using Xamarin.Forms.Xaml;

namespace BioTrakOperator.Pages
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class TrackingPage : BioTrakContentPage
    {
        private User user;
        public TrackingPage()
        {
            InitializeComponent();
        }

        public TrackingPage(User user, String itemID)
        {
            InitializeComponent();
            this.user = user;
            treeView.SelectionMode = Syncfusion.XForms.TreeView.SelectionMode.Single;
            treeView.SelectionChanged += TreeView_SelectionChanged;
            PopulateTree(itemID);


        }

        private async void TreeView_SelectionChanged(object sender, Syncfusion.XForms.TreeView.ItemSelectionChangedEventArgs e)
        {
            if (e.AddedItems.Count == 1)
            {
                await Navigation.PushAsync(new LotPage(user, true, ((TagNode)e.AddedItems[0]).Tag));
            }
        }

        private async void PopulateTree(string itemID)
        {   
            Track t = await ServerInterface.GetTreeForItemID(user, itemID);
            TreeViewNodeCollection tvnc = new TreeViewNodeCollection();
            treeView.Nodes.Clear();
            TagNode tvn = new TagNode() { Content  =  t.name, Tag = t};
            
            AddChildren(tvn, t.supplyChain);
            tvnc.Add(tvn);
            treeView.Nodes = tvnc;

        }

        private void AddChildren(TreeViewNode tvn, List<Track> supplyChain)
        {
            foreach (Track t in supplyChain)
            {
                TagNode tn = new TagNode() { Content = t.name, Tag = t };
                AddChildren(tn, t.supplyChain);
                tvn.ChildNodes.Add(tn);
            }
        }
    }

}