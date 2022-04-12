﻿using BioTrakModels;
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
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace BioTrakDesktop
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private User user;
        public MainWindow()
        {
            InitializeComponent();
            this.Loaded += Form_Loaded;
        }

        

        private void Form_Loaded(object sender, RoutedEventArgs e)
        {
            Login lg = new Login();
            lg.ShowDialog();
            lg.LoggedIn += Load;
        }

        private void Load(User u)
        {
            user = u;
        }
    }
}
