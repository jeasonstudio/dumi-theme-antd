import {
  FacebookOutlined,
  GithubOutlined,
  GitlabOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  WeiboOutlined,
  YuqueOutlined,
  ZhihuOutlined
} from '@ant-design/icons';
import { css } from '@emotion/react';
import { Tooltip } from 'antd';
import React, { type FC, type ReactNode } from 'react';
import { SocialTypes } from 'dumi/dist/client/theme-api/types';
import useAdditionalThemeConfig from '../../hooks/useAdditionalThemeConfig';
import useSiteToken from '../../hooks/useSiteToken';

const BASE_SIZE = '1.2em';

const useStyle = () => {
  const { token } = useSiteToken();
  const { controlHeight, motionDurationMid } = token;

  return {
    btn: css`
      color: ${token.colorText};
      border-color: ${token.colorBorder};
      padding: 0 !important;
      width: ${controlHeight}px;
      height: ${controlHeight}px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: none;
      background: transparent;
      border-radius: ${token.borderRadius}px;
      transition: all ${motionDurationMid};
      cursor: pointer;

      .btn-inner {
        transition: all ${motionDurationMid};
      }

      &:hover {
        background: ${token.colorBgTextHover};
      }

      img {
        width: ${BASE_SIZE};
        height: ${BASE_SIZE};
      }

      .anticon {
        font-size: ${BASE_SIZE};
      }
    `
  };
};

const iconMap: Record<SocialTypes, ReactNode> = {
  github: GithubOutlined,
  facebook: FacebookOutlined,
  twitter: TwitterOutlined,
  gitlab: GitlabOutlined,
  linkedin: LinkedinOutlined,
  zhihu: ZhihuOutlined,
  weibo: WeiboOutlined,
  yuque: YuqueOutlined
};

function formatTitle(title: string) {
  return `${title[0].toUpperCase()}${title.slice(1)}`;
}

const HeaderExtra: FC = () => {
  const { github, socialLinks } = useAdditionalThemeConfig();
  const style = useStyle();

  const links = React.useMemo(() => {
    let curLinks = socialLinks;
    if (!curLinks) {
      curLinks = {};
    }
    if (github) {
      curLinks.github = github;
    }
    return curLinks;
  }, [github, socialLinks]);
  return (
    <>
      {Object.keys(links).map((key) => {
        const Icon = iconMap[key];
        return (
          <Tooltip title={formatTitle(key)} key={key}>
            <a href={socialLinks?.[key]} target="_blank" rel="noreferrer">
              <button css={[style.btn]} type="button">
                <Icon />
              </button>
            </a>
          </Tooltip>
        );
      })}
    </>
  );
};

export default HeaderExtra;
