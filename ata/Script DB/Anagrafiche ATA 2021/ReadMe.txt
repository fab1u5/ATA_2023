Script clean-up
	
	00.ATA_Clean -> Anagrafica e punteggi
		
		Cars
		Teams
		
		Examiner *
		ExamBoards *
		
		Scores *
		Penalities

---->	Va lanciato solo quando viene richiesto di pulire i punteggi ad hoc.
	00.ATA_CleanOnlyScores -> SOLO Punteggi per Piero x ATABETA
		
Script popolamento nuova anagrafica (da eseguire nell'ordine)
	
	01.ATA_Fuel
	02.ATA_Teams
	03.ATA_Cars
-->	04.ATA_Examiners non lanciarlo PIERO vuole che l'elenco sia vuoto. Se invece volesse elenco va lanciato