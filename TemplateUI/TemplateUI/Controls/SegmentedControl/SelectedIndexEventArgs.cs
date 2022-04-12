﻿using System;
namespace TemplateUI.Controls
{
    public class SelectedIndexEventArgs : EventArgs
    {
        public SelectedIndexEventArgs(int selectedIndex)
        {
            SelectedIndex = selectedIndex;
        }

        public int SelectedIndex { get; set; }
    }
}