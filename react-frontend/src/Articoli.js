import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

const Articoli = () => {
    const [articoli, setArticoli] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [filtro, setFiltro] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'CODICEARTICOLO', direction: 'asc' });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const [showModal, setShowModal] = useState(false);
    const [selectedArticolo, setSelectedArticolo] = useState(null);

    const fetchArticoli = async () => {
        try {
            const response = await fetch('http://192.168.1.246:5001/articoli');
            if (!response.ok) throw new Error('Errore nel recupero dati');
            const data = await response.json();

            const cleanedData = data.map(a => ({
                CODICEARTICOLO: a.CODICEARTICOLO?.trim() || '',
                DESCRIZIONEARTICOLO: a.DESCRIZIONEARTICOLO?.trim() || '',
                UM1: a.UM1?.trim() || '',
                UM2: a.UM2?.trim() || '',
                PREZZOUNITARIO: a.PREZZOUNITARIO || 0,
            }));

            setArticoli(cleanedData);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticoli();
    }, []);

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
        setSortConfig({ key, direction });
    };

    const filteredArticoli = articoli.filter(a =>
        a.CODICEARTICOLO.toLowerCase().includes(filtro.toLowerCase()) ||
        a.DESCRIZIONEARTICOLO.toLowerCase().includes(filtro.toLowerCase())
    );

    const sortedArticoli = [...filteredArticoli].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });

    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentItems = sortedArticoli.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(sortedArticoli.length / itemsPerPage);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const maxPrice = articoli.reduce((max, a) => (a.PREZZOUNITARIO > max ? a.PREZZOUNITARIO : max), 0);
    const minPrice = articoli.reduce((min, a) => (a.PREZZOUNITARIO < min ? a.PREZZOUNITARIO : min), maxPrice);

    const getPriceBadgeClass = (price) => {
        if (maxPrice === minPrice) return 'badge-low';
        const ratio = (price - minPrice) / (maxPrice - minPrice);
        if (ratio < 0.33) return 'badge-low';
        if (ratio < 0.66) return 'badge-medium';
        return 'badge-high';
    };

    const getPriceTooltip = (price) => {
        if (maxPrice === minPrice || price < minPrice + (maxPrice - minPrice) / 3) return 'Basso';
        if (price < minPrice + 2 * (maxPrice - minPrice) / 3) return 'Medio';
        return 'Alto';
    };

    const openModal = (articolo) => {
        setSelectedArticolo(articolo);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedArticolo(null);
    };

    return (
        <div className="container my-4">
            <div className="text-center mb-4 title-container p-4 rounded bg-primary text-white">
                <h1 className="display-4 fw-bold mb-2">
                    <i className="bi bi-card-list me-2"></i>ELENCO ARTICOLI
                </h1>
                <p className="lead">
                    Sfoglia tutti gli articoli disponibili, cerca e ordina rapidamente
                </p>
                <div className="mx-auto mt-3" style={{ maxWidth: '400px' }}>
                    <input
                        type="text"
                        placeholder="Cerca per codice o descrizione"
                        value={filtro}
                        onChange={e => setFiltro(e.target.value)}
                        className="form-control text-center shadow-sm"
                    />
                </div>
            </div>

            {loading && <p>Caricamento articoli...</p>}
            {error && <p className="text-danger">Errore: {error}</p>}

            <table className="table table-hover table-striped text-center">
                <thead className="table-dark">
                    <tr>
                        <th onClick={() => handleSort('CODICEARTICOLO')} style={{ cursor: 'pointer' }}>
                            Codice{' '}
                            {sortConfig.key === 'CODICEARTICOLO' && (
                                <i className={`bi bi-caret-${sortConfig.direction === 'asc' ? 'up-fill' : 'down-fill'}`}></i>
                            )}
                        </th>
                        <th onClick={() => handleSort('DESCRIZIONEARTICOLO')} style={{ cursor: 'pointer' }}>
                            Descrizione{' '}
                            {sortConfig.key === 'DESCRIZIONEARTICOLO' && (
                                <i className={`bi bi-caret-${sortConfig.direction === 'asc' ? 'up-fill' : 'down-fill'}`}></i>
                            )}
                        </th>
                        <th>UM1</th>
                        <th>UM2</th>
                        <th onClick={() => handleSort('PREZZOUNITARIO')} style={{ cursor: 'pointer' }} className="text-end">
                            Prezzo Unitario{' '}
                            {sortConfig.key === 'PREZZOUNITARIO' && (
                                <i className={`bi bi-caret-${sortConfig.direction === 'asc' ? 'up-fill' : 'down-fill'}`}></i>
                            )}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((a) => (
                        <tr key={a.CODICEARTICOLO} onClick={() => openModal(a)} style={{ cursor: 'pointer' }}>
                            <td>{a.CODICEARTICOLO}</td>
                            <td>{a.DESCRIZIONEARTICOLO}</td>
                            <td>{a.UM1}</td>
                            <td>{a.UM2}</td>
                            <td className="text-end">
                                <span
                                    className={`badge badge-custom ${getPriceBadgeClass(a.PREZZOUNITARIO)}`}
                                    title={getPriceTooltip(a.PREZZOUNITARIO)}
                                >
                                    <i className="bi bi-currency-euro me-1"></i>
                                    {a.PREZZOUNITARIO.toFixed(2)}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* PAGINAZIONE SEMPLICE */}
            <nav>
                <ul className="pagination justify-content-center flex-wrap">
                    {/* Prima pagina */}
                    {currentPage > 2 && (
                        <li className="page-item">
                            <button className="page-link" onClick={() => handlePageChange(1)}>1</button>
                        </li>
                    )}

                    {/* Ellissi iniziale */}
                    {currentPage > 3 && (
                        <li className="page-item disabled">
                            <span className="page-link">…</span>
                        </li>
                    )}

                    {/* Pagine vicine */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter(p => Math.abs(p - currentPage) <= 1)
                        .map(page => (
                            <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(page)}>
                                    {page}
                                </button>
                            </li>
                        ))}

                    {/* Ellissi finale */}
                    {currentPage < totalPages - 2 && (
                        <li className="page-item disabled">
                            <span className="page-link">…</span>
                        </li>
                    )}

                    {/* Ultima pagina */}
                    {currentPage < totalPages - 1 && (
                        <li className="page-item">
                            <button className="page-link" onClick={() => handlePageChange(totalPages)}>
                                {totalPages}
                            </button>
                        </li>
                    )}
                </ul>
            </nav>


            {sortedArticoli.length === 0 && !loading && <p>Nessun articolo trovato</p>}

            {/* MODAL */}
            {showModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="close-btn" onClick={closeModal}>×</button>
                        <h4>Dettagli Articolo</h4>
                        <p><strong>Codice:</strong> {selectedArticolo?.CODICEARTICOLO}</p>
                        <p><strong>Descrizione:</strong> {selectedArticolo?.DESCRIZIONEARTICOLO}</p>
                        <p><strong>UM1:</strong> {selectedArticolo?.UM1}</p>
                        <p><strong>UM2:</strong> {selectedArticolo?.UM2}</p>
                        <p><strong>Prezzo Unitario:</strong> {selectedArticolo?.PREZZOUNITARIO.toFixed(2)}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Articoli;
