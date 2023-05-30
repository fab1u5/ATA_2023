per aggiornare le pagine per la versione mobile

1.
	occorre, dopo aver aggiornato i files presenti attualmente nella cartella:

	nei files .js (directory js), modificare la chiamata al WebService 
	 - da services/xxxxx.asmx
	 - in http://ems.polimatica.it/ATA/services/xxxxx.asmx
	 
	 Al momento i files sono
	  - ConfigurationDirectives.js
	  - ToolsDN.js
	  - ToolsUP.js
	  - WSDirectives.js
	  
2.
	Nel file Index.html aggiornare l'anno, NON copiarlo perchè NON è identico a quello sul sito, ha solo il bottone Standalone
	L'anno si trova nel file utilities.js (directory js) -> footer: function ()