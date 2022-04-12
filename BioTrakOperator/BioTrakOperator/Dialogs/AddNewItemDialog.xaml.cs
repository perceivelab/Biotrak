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
    public partial class AddNewItemDialog : ContentPage
    {
        public delegate void TextItem();
        public delegate void PhotoItem();

        public event TextItem AddingTextItem;
        public event PhotoItem AddingPhotoItem;
        public AddNewItemDialog()
        {
            InitializeComponent();
        }

        private void AddNewPhotoObject(object sender, EventArgs e)
        {
            AddingPhotoItem();
        }

        private void AddNewTextObject(object sender, EventArgs e)
        {
            AddingTextItem();
        }
    }
}