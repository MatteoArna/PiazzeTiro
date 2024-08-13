import React, { useState, useEffect } from 'react';
import { getIcon } from '../../../utils/newsUtil';
import './NewsSummary.css';
import InfoModal from '../../InfoModal/InfoModal';

import { useTranslation } from 'react-i18next';

const NewsSummary = ({ page, isAdmin, onEditPage, onDeletePage }) => {
  const [showModal, setShowModal] = useState(false);

  const { t } = useTranslation();

  return (
    <div className="news-summary">
      <div className="card" key={page.id}>
        <div className="card-icon">
          <img src={getIcon(page.typeId)} alt={page.typeId} />
        </div>
        <div className="card-content">
          <h3>{t(('news_page.' + page.typeId))}</h3>
          <p>{page.summary}</p>
          <a href="#" onClick={() => setShowModal(true)}>{t('news_page.more_info')}</a>
          {isAdmin && (
            <AdminControls
              page={page}
              onEditPage={onEditPage}
              onDeletePage={onDeletePage}
              t={t}
            />
          )}
        </div>
      </div>
      {showModal && (
        <InfoModal
          title={t(('news_page.' + page.typeId)) }
          subtitle={page.summary}
          content={page.content}
          icon={getIcon(page.typeId)}
          file={page.file}
          showPreview={page.file && page.file.type.startsWith('image/')}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

const AdminControls = ({ page, onEditPage, onDeletePage, t }) => (
  <>
    <button className="edit-button" onClick={() => onEditPage(page)}>{t('news_page.edit')}</button>
    <button className="delete-button" onClick={() => onDeletePage(page.id)}>{t('news_page.delete')}</button>
  </>
);

export default NewsSummary;
