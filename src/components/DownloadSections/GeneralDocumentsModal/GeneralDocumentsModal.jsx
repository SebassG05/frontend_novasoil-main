import React, { useEffect, useState } from 'react';
import styles from './GeneralDocumentsModal.module.css';

const GeneralDocumentsModal = ({ visible, onClose }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
    const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (!visible) return;
    setLoading(true);
    fetch('/downloads/generalindex.json')
      .then((r) => r.json())
      .then((data) => {
        setItems(Array.isArray(data) ? data : []);
      })
      .catch((e) => {
        console.error('Error loading downloads index', e);
        setItems([]);
      })
      .finally(() => setLoading(false));
  }, [visible]);

  if (!visible && !closing) return null;

  return (
    <div className={`${styles.backdrop} ${closing ? styles.closingBackdrop : ''}`} role="dialog" aria-modal="true">
      <div className={`${styles.modal} ${closing ? styles.closingModal : ''}`}>
        <header className={styles.header}>
          <h3 className={styles.titleHeader}>General Documents</h3>
          <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
            <button aria-label="Cerrar" className={styles.closeBtn} onClick={() => {
              setClosing(true);
              // wait for CSS closing animation to finish (900ms)
              setTimeout(() => {
                setClosing(false);
                onClose();
              }, 920);
            }}>×</button>
          </div>
        </header>

        <div className={styles.content}>
          <aside className={styles.gridPane}>
            {loading && <div className={styles.empty}>Loading...</div>}
            {!loading && items.length === 0 && (
              <div className={styles.empty}>No PDFs found. Add an <code>index.json</code> in <code>/public/downloads</code></div>
            )}
            <div className={styles.grid}>
              {items.map((it) => {
                const isSelected = selected?.filename === it.filename;
                return (
                  <button
                    key={it.filename}
                    className={`${styles.card} ${isSelected ? styles.selected : ''}`}
                    onClick={() => setSelected(it)}
                    aria-pressed={isSelected}
                  >
                    <div className={styles.thumb}>
                      {/* Small inline preview via iframe in a tiny box */}
                      <iframe title={it.title} src={`/downloads/${it.filename}#toolbar=0&navpanes=0`} frameBorder="0" />
                    </div>
                    <div className={styles.meta}>
                      <div className={styles.title}>{it.title}</div>
                      {it.description && <div className={styles.desc}>{it.description}</div>}
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          <section className={styles.previewPane} aria-live="polite">
            {!selected && <div className={styles.previewEmpty}>Select a document to preview</div>}
            {selected && (
              <div className={styles.previewInner}>
                <div className={styles.previewHeader}>
                  <h4>{selected.title}</h4>
                    <a className={styles.downloadTopBtn} href={selected ? `/downloads/${selected.filename}` : '/downloads/index.json'} download={!!selected} target="_blank" rel="noopener noreferrer">
              {selected ? 'Download' : ''}
                </a>
                </div>
                <div className={styles.previewFrame}>
                  <iframe title={`Preview ${selected.title}`} src={`/downloads/${selected.filename}#zoom=67`} frameBorder="0" />
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default GeneralDocumentsModal;
