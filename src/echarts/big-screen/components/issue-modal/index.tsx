import { CloseOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, Modal, Spin, Tooltip } from 'antd';
import type { UseShowInstanceRef } from 'rc-use-hooks';
import { useShow } from 'rc-use-hooks';
import { useEffect, useState } from 'react';
import styles from './index.less';
import type { IssueRecord, IssueType } from './interface';
import { apiGetAirIssues, apiGetLandIssues, apiGetWaterIssues } from './service';
import { getGasToken, getWaterToken } from '../../utils';

type Props = {
  modalRef: UseShowInstanceRef;
};

const IssueModal = ({ modalRef }: Props) => {
  const { open, updateOpen, showRecord } = useShow(modalRef);
  const [activeType, setActiveType] = useState<IssueType>('水');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [issueData, setIssueData] = useState<IssueRecord[]>([]);
  const [total, setTotal] = useState(0);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [detailUrl, setDetailUrl] = useState('');
  const [iframeLoading, setIframeLoading] = useState(false);

  const areaName = showRecord?.name || '未知区域';

  // 气问题接口
  const airRequest = useRequest(apiGetAirIssues, {
    manual: true,
    onSuccess: (result) => {
      if (result.code === 200 || result.code === 0) {
        setIssueData(result?.data?.list || []);
        setTotal(result.data?.total || 0);
      }
    },
  });

  // 水问题接口
  const waterRequest = useRequest(apiGetWaterIssues, {
    manual: true,
    onSuccess: (result) => {
      if (result.code === 200 || result.code === 0) {
        setIssueData(result?.data?.list || []);
        setTotal(result.data?.total || 0);
      }
    },
  });

  // 废问题接口
  const landRequest = useRequest(apiGetLandIssues, {
    manual: true,
    onSuccess: (result) => {
      if (result.code === 200 || result.code === 0) {
        setIssueData(result?.data?.list || []);
        setTotal(result.data?.total || 0);
      }
    },
  });

  const loading = airRequest.loading || waterRequest.loading || landRequest.loading;

  // 根据类型获取数据
  const fetchDataByType = (type: IssueType, page?: number) => {
    // 使用传入的page参数，如果没有则使用currentPage
    const targetPage = page ?? currentPage;

    // const params = {
    //   pageNo: type === '废' ? targetPage : 1, // '废'类型传递当前页，其他类型始终请求第1页获取全量数据
    //   pageSize: type === '废' ? pageSize : 9999999999, // '废'类型使用分页大小，其他类型请求全量
    //   district: areaName,
    // };
    const params = {
      pageNo: targetPage, // '废'类型传递当前页，其他类型始终请求第1页获取全量数据
      pageSize: pageSize, // '废'类型使用分页大小，其他类型请求全量
      district: areaName,
    };

    switch (type) {
      case '气':
        airRequest.run(params);
        break;
      case '水':
        waterRequest.run(params);
        break;
      case '废':
        landRequest.run(params);
        break;
    }
  };

  // 类型切换
  const handleTypeChange = (type: IssueType) => {
    // 取消所有正在进行的请求
    airRequest.cancel();
    waterRequest.cancel();
    landRequest.cancel();

    setActiveType(type);
    // 清空数据
    setCurrentPage(1);
    setIssueData([]);
    setTotal(0);
    fetchDataByType(type, 1); // 切换类型时从第1页开始
  };

  // 页面变化
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 页大小变化
  const handlePageSizeChange = (size: number) => {
    // 取消所有正在进行的请求
    airRequest.cancel();
    waterRequest.cancel();
    landRequest.cancel();

    setPageSize(size);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (open) {
      // 取消之前的请求
      airRequest.cancel();
      waterRequest.cancel();
      landRequest.cancel();

      // 重置所有状态
      setCurrentPage(1);
      setPageSize(10);
      setActiveType('水');
      setIssueData([]);
      setTotal(0);

      // 用重置后的默认类型'水'获取数据
      fetchDataByType('水', 1);
    }
  }, [showRecord?.name, open]);

  // 当currentPage/pageSize变化时，重新获取数据
  useEffect(() => {
    if (open) {
      // 取消之前的请求
      airRequest.cancel();
      waterRequest.cancel();
      landRequest.cancel();

      fetchDataByType(activeType);
    }
  }, [currentPage, pageSize]);

  const handleCancel = () => {
    updateOpen(false);
  };

  const handleDetailClick = (url: string) => {
    let pageUrl = url;
    if (activeType === '气') {
      const token = getGasToken() || '';
      pageUrl += '&token=' + token;
    }
    setDetailUrl(pageUrl);
    setIframeLoading(true);
    setDetailModalOpen(true);
  };

  const handleDetailModalCancel = () => {
    setDetailModalOpen(false);
    setIframeLoading(false);
  };

  const handleIframeLoad = () => {
    setIframeLoading(false);
  };

  const totalPages = Math.ceil(total / pageSize);
  // 根据activeType决定如何显示数据
  const currentData = issueData;
  // activeType === '废'
  //   ? issueData // '废'类型直接使用接口返回的当前页数据
  //   : issueData.slice((currentPage - 1) * pageSize, currentPage * pageSize); // 其他类型前端分页

  const renderTypeButtons = () => (
    <div className={styles.typeButtons}>
      {[{ type: '水' }, { type: '气' }, { type: '废' }].map((item) => (
        <div
          key={item.type}
          className={`${styles.typeButton} ${activeType === item.type ? styles.active : ''}`}
          onClick={() => handleTypeChange(item.type as IssueType)}
        >
          {item.type}
        </div>
      ))}
    </div>
  );

  const renderTableCell = (content: string, className?: string) => {
    if (!content || content === '--') {
      return <div className={className}>{content}</div>;
    }

    return (
      <Tooltip title={content} placement="topLeft" color="#5fbbf9">
        <div className={className}>
          <div className={styles.tableCellContent}>{content}</div>
        </div>
      </Tooltip>
    );
  };

  const renderTable = () => (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <div className={`${styles.tableCell} ${styles.typeCol}`}>类型</div>
        <div className={`${styles.tableCell} ${styles.nameCol}`}>问题类型</div>
        <div className={`${styles.tableCell} ${styles.issueTypeCol}`}>问题名称</div>
        <div className={`${styles.tableCell} ${styles.flexCol}`}>问题描述</div>
        <div className={`${styles.tableCell} ${styles.actionCol}`}>操作</div>
      </div>
      <div className={styles.tableBody}>
        {loading ? (
          <div className={styles.loadingContainer}>数据加载中...</div>
        ) : currentData?.length > 0 ? (
          currentData.map((item, index) => (
            <div
              key={item.questionId}
              className={`${styles.tableRow} ${index === 6 ? styles.highlighted : ''}`}
            >
              {renderTableCell(activeType, `${styles.tableCell} ${styles.typeCol}`)}
              {renderTableCell(item.questionType, `${styles.tableCell} ${styles.nameCol}`)}
              {renderTableCell(item.questionName, `${styles.tableCell} ${styles.issueTypeCol}`)}
              {renderTableCell(item.questionDescription, `${styles.tableCell} ${styles.flexCol}`)}
              <div className={`${styles.tableCell} ${styles.actionCol}`}>
                <span onClick={() => handleDetailClick(item.url)} className={styles.actionLink}>
                  查看详情
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.emptyContainer}>暂无数据</div>
        )}
      </div>
    </div>
  );

  const renderPagination = () => {
    // 计算需要显示的页码范围
    const getPageNumbers = () => {
      const maxVisiblePages = 5; // 最多显示7个页码按钮
      // 当前页左右尽量各留 2 个位置
      const halfMaxVisible = Math.floor(maxVisiblePages / 2);

      if (totalPages <= maxVisiblePages) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }
      // 先按“当前页居中”估算起点：start = max(1, currentPage - 2)
      let start = Math.max(1, currentPage - halfMaxVisible);
      // 由起点推算终点：end = min(totalPages, start + 4)（保证最多 5 个）
      let end = Math.min(totalPages, start + maxVisiblePages - 1);
      // 若此时区间长度不足 5（通常发生在靠近尾部时），反向补齐起点
      if (end - start + 1 < maxVisiblePages) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }

      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const pageNumbers = getPageNumbers();
    const showPrevEllipsis = pageNumbers[0] > 2;
    const showNextEllipsis = pageNumbers[pageNumbers.length - 1] < totalPages - 1;

    return (
      <div className={styles.pagination}>
        <div className={styles.paginationLeft}>
          {/* 上一页按钮 */}
          <Button
            className={styles.pageBtn}
            disabled={currentPage === 1 || total === 0}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <LeftOutlined style={{ fontSize: '14px', color: '#fff' }} />
          </Button>

          {/* 第一页（如果不在页码范围内） */}
          {pageNumbers[0] > 1 && (
            <>
              <Button
                className={`${styles.pageBtn} ${currentPage === 1 ? styles.active : ''}`}
                onClick={() => handlePageChange(1)}
              >
                <span className={styles.pageBtnText}>1</span>
              </Button>
              {showPrevEllipsis && <span className={styles.ellipsis}>...</span>}
            </>
          )}

          {/* 页码按钮 */}
          {pageNumbers.map((pageNum) => (
            <Button
              key={pageNum}
              className={`${styles.pageBtn} ${currentPage === pageNum ? styles.active : ''}`}
              onClick={() => handlePageChange(pageNum)}
            >
              {pageNum}
            </Button>
          ))}

          {/* 最后一页（如果不在页码范围内） */}
          {pageNumbers[pageNumbers.length - 1] < totalPages && (
            <>
              {showNextEllipsis && <span className={styles.ellipsis}>...</span>}
              <Button
                className={`${styles.pageBtn} ${currentPage === totalPages ? styles.active : ''}`}
                onClick={() => handlePageChange(totalPages)}
              >
                {totalPages}
              </Button>
            </>
          )}

          {/* 下一页按钮 */}
          <Button
            className={styles.pageBtn}
            disabled={currentPage === totalPages || total === 0}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <RightOutlined style={{ fontSize: '14px', color: '#fff' }} />
          </Button>
        </div>

        <div className={styles.paginationRight}>
          <select
            className={styles.pageSizeSelect}
            value={pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
          >
            <option value={10}>10条/页</option>
            <option value={15}>15条/页</option>
            <option value={20}>20条/页</option>
            <option value={50}>50条/页</option>
            <option value={100}>100条/页</option>
          </select>

          <div className={styles.jumpTo}>
            {/* <span>
              第 {currentPage} / {totalPages} 页
            </span> */}
            <span>共 {total} 条</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Modal
      centered
      className={styles.issueModal}
      title={null}
      closable={false}
      width="90%"
      height="655px"
      wrapClassName={styles.issueModalWrap}
      open={open}
      onCancel={handleCancel}
      footer={null}
    >
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <div className={styles.modalTitle}>
            <span className={styles.titleText}>{areaName}问题列表</span>
          </div>
          {renderTypeButtons()}
          <div className={styles.closeButton} onClick={handleCancel}>
            <CloseOutlined style={{ fontSize: '24px', color: '#5FBBF9' }} />
          </div>
        </div>
        <div className={styles.modalBody}>
          {renderTable()}
          {renderPagination()}
        </div>
      </div>

      {/* Detail Modal with iframe */}
      <Modal
        centered
        className={styles.detailModal}
        title={null}
        closable={false}
        width="80%"
        height="80vh"
        wrapClassName={styles.detailModalWrap}
        open={detailModalOpen}
        onCancel={handleDetailModalCancel}
        footer={null}
      >
        <div className={styles.detailModalContent}>
          <div className={styles.detailModalCloseButton} onClick={handleDetailModalCancel}>
            <CloseOutlined style={{ fontSize: '20px', color: '#5FBBF9' }} />
          </div>
          {iframeLoading && (
            <div className={styles.loadingContainer}>
              <Spin size="large" tip="加载中..." />
            </div>
          )}
          {detailUrl && (
            <iframe
              key={detailUrl}
              src={detailUrl}
              className={styles.detailIframe}
              style={{ border: 'none', display: iframeLoading ? 'none' : 'block' }}
              title="详情"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              allow="camera; microphone; fullscreen"
              onLoad={handleIframeLoad}
            />
          )}
        </div>
      </Modal>
    </Modal>
  );
};

export default IssueModal;
