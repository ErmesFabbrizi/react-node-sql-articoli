-- Creazione tabella Articoli
CREATE TABLE Articoli (
    CODICEARTICOLO VARCHAR(50) NOT NULL PRIMARY KEY,
    DESCRIZIONEARTICOLO VARCHAR(255) NOT NULL,
    UM1 VARCHAR(10),
    UM2 VARCHAR(10),
    PREZZOUNITARIO DECIMAL(10, 2) DEFAULT 0
);

-- Inserimento dati di esempio
INSERT INTO
    Articoli (
        CODICEARTICOLO,
        DESCRIZIONEARTICOLO,
        UM1,
        UM2,
        PREZZOUNITARIO
    )
VALUES
    (
        'A001',
        'Articolo di prova 1',
        'pz',
        'box',
        12.50
    ),
    ('A002', 'Articolo di prova 2', 'kg', 'pz', 8.30);

-- Creazione vista
CREATE VIEW vw_MiaVistaArticoli AS
SELECT
    *
FROM
    Articoli;