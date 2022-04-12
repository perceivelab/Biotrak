using BioTrakModels;
using BioTrakOperator.Models;
using BioTrakOperator.Pages;
using System;
using System.Collections.Generic;
using System.Text;

namespace BioTrakOperator
{
    public class Utils
    {
        public static Settings GetSettingsForOperation(Operations op)
        {
            Settings s= new Settings();
            s.Operation = op;
            switch (op)
            {
                case Operations.TRACE:
                    s.Title = "Traccia alimento";
                    s.TargetType = typeof(ScannerPage);
                    s.NextTargetType = typeof(TrackingPage);
                    break;

                case Operations.OPENSACK:
                    s.ConfiramtionText = "Sei sicuro di voler aprire il sacco?";
                    s.Title = "Apri sacco";
                    s.TargetType = typeof(ScannerPage);
                    s.NextTargetType = typeof(OperationConfirmation);
                    break;

                case Operations.CLOSESACK:
                    s.ConfiramtionText = "Sei sicuro di voler registrare la terminazione del sacco?";
                    s.Title = "Chiudi sacco";
                    s.TargetType = typeof(ScannerPage);
                    s.NextTargetType = typeof(OperationConfirmation);
                    break;

                case Operations.BOXDELIVERED:
                    s.Title = "Consegna pacco";
                    s.ConfiramtionText = "Sei sicuro di aver consegnato il pacco?";
                    s.TargetType = typeof(ScannerPage);
                    s.NextTargetType = typeof(OperationConfirmation);
                    break;
                case Operations.BOXRECEIVED:
                    s.Title = "Ricezione pacco";
                    s.ConfiramtionText = "Sei sicuro di aver ricevuto il pacco?";
                    s.TargetType = typeof(ScannerPage);
                    s.NextTargetType = typeof(OperationConfirmation);
                    break;
                case Operations.LOGOUT:
                    s.Title = "Logout";
                    s.ConfiramtionText = "Sei sicuro di uscire?";
                    s.TargetType = typeof(LogoutPage);
                    s.NextTargetType = null;
                    break;
                case Operations.CREATE_PRODUCTION:
                    s.Title = "Crea produzione";
                    s.ConfiramtionText = "Sei sicuro di voler creare una nuova produzione?";
                    s.TargetType = typeof(ProductionCreation);
                    s.NextTargetType = null;
                    break;

                default:
                    return null;
            }
            return s;
        }
        
    }
}
