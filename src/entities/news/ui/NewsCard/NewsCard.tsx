import { FC, useState } from 'react';
import { Button, Tooltip, Modal } from 'antd';
import { 
  HeartOutlined, 
  HeartFilled,
  BookOutlined,
  BookFilled,
  ShareAltOutlined 
} from '@ant-design/icons';
import { 
  FacebookShareButton, 
  TwitterShareButton, 
  TelegramShareButton,
  WhatsappShareButton 
} from 'react-share';
import { useUserActions } from '@/entities/user/model/hooks';
import type { Article } from '@/app/types';
import styles from './NewsCard.module.scss';

interface NewsCardProps {
  article: Article;
}

const formatContent = (content: string) => {
  return content.replace(/\[\+\d+ chars\]$/, '').trim();
};

export const NewsCard: FC<NewsCardProps> = ({ article }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    title,
    description,
    urlToImage,
    author,
    publishedAt,
    url,
    source,
    content,
  } = article;

  const { 
    isLiked,
    isReadLater,
    isRead,
    toggleLike,
    toggleReadLater,
    markAsRead 
  } = useUserActions();

  const formatAuthor = (author: string | null) => {
    return author?.trim() || 'Unspecified';
  };

  const handleReadMore = () => {
    window.open(url, '_blank');
    markAsRead(url);
    setIsModalOpen(false);
  };

  const shareButtons = (
    <div className={styles.shareButtons}>
      <FacebookShareButton url={url} title={title}>
        <Button type="text" icon={<i className="fab fa-facebook" />} />
      </FacebookShareButton>
      <TwitterShareButton url={url} title={title}>
        <Button type="text" icon={<i className="fab fa-twitter" />} />
      </TwitterShareButton>
      <TelegramShareButton url={url} title={title}>
        <Button type="text" icon={<i className="fab fa-telegram" />} />
      </TelegramShareButton>
      <WhatsappShareButton url={url} title={title}>
        <Button type="text" icon={<i className="fab fa-whatsapp" />} />
      </WhatsappShareButton>
    </div>
  );

  const actionButtons = (
    <div className={styles.actions}>
      <Button 
        type="text"
        icon={isLiked(url) ? <HeartFilled /> : <HeartOutlined />}
        onClick={(e) => {
          e.stopPropagation();
          toggleLike(url);
        }}
        className={styles.actionButton}
        aria-label={isLiked(url) ? "Remove from favorites" : "Add to favorites"}
      />
      <Button
        type="text"
        icon={isReadLater(url) ? <BookFilled /> : <BookOutlined />}
        onClick={(e) => {
          e.stopPropagation();
          toggleReadLater(url);
        }}
        className={styles.actionButton}
        aria-label={isReadLater(url) ? "Remove from read later" : "Add to read later"}
      />
      <Tooltip title={shareButtons} placement="bottom">
        <Button
          type="text"
          icon={<ShareAltOutlined />}
          onClick={(e) => e.stopPropagation()}
          className={styles.actionButton}
          aria-label="Share"
        />
      </Tooltip>
      <Button 
        type="primary"
        onClick={(e) => {
          e.stopPropagation();
          handleReadMore();
        }}
        className={styles.readMore}
      >
        Read More
      </Button>
    </div>
  );

  return (
    <>
      <article 
        className={`${styles.card} ${isRead(url) ? styles.read : ''}`}
        onClick={() => setIsModalOpen(true)}
      >
        {urlToImage && (
          <img 
            src={urlToImage} 
            alt={title} 
            className={styles.image}
            loading="lazy"
          />
        )}
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
          <div className={styles.meta}>
            <span>{formatAuthor(author)}</span>
            <time dateTime={publishedAt}>
              {new Date(publishedAt).toLocaleDateString()}
            </time>
          </div>
          {actionButtons}
        </div>
      </article>

      <Modal
        title={null}
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        width={800}
        className={styles.modal}
        destroyOnClose
      >
        <div className={styles.modalContent}>
          {urlToImage && (
            <img 
              src={urlToImage} 
              alt={title} 
              className={styles.modalImage}
            />
          )}
          <div className={styles.modalMeta}>
            <div className={styles.modalMetaItem}>
              <span className={styles.modalMetaLabel}>Source:</span>
              <span>{source.name}</span>
            </div>
            <div className={styles.modalMetaItem}>
              <span className={styles.modalMetaLabel}>Author:</span>
              <span>{formatAuthor(author)}</span>
            </div>
            <div className={styles.modalMetaItem}>
              <span className={styles.modalMetaLabel}>Published:</span>
              <time dateTime={publishedAt}>
                {new Date(publishedAt).toLocaleDateString()}
              </time>
            </div>
          </div>
          <h2 className={styles.modalTitle}>{title}</h2>
          <p className={styles.modalDescription}>{description}</p>
          <div className={styles.modalContent}>
            {content && formatContent(content).split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <div className={styles.modalActions}>
            {actionButtons}
          </div>
        </div>
      </Modal>
    </>
  );
}; 