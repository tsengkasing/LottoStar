/**
 * Created by Think on 2017/5/18.
 */
import React from 'react';

import './Footer.css';

export default class Footer extends React.Component {

    render() {
        return (
            <div className="footer-background">
                <div className="edge footer">
                    <div className="footer-left">
                        <div className="footer-left-tips">
                            <div className="footer-left-tips-title">新手指南</div>
                            <ul>
                                <li>了解乐透星</li>
                                <li>服务协议</li>
                                <li>常见问题</li>
                                <li>投诉建议</li>
                            </ul>
                        </div>
                        <div className="footer-left-tips">
                            <div className="footer-left-tips-title">乐透保障</div>
                            <ul>
                                <li>公平保障</li>
                                <li>公正保障</li>
                                <li>公开保障</li>
                                <li>安全支付</li>
                            </ul>
                        </div>
                        <div className="footer-left-tips">
                            <div className="footer-left-tips-title">商品配送</div>
                            <ul>
                                <li>长时间未收到商品</li>
                                <li>商品配送</li>
                                <li>配送费用</li>
                                <li>商品验收与签收</li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-right">
                        <div className="footer-right-item">
                            <i className="ico ico-state-1"/>
                            &nbsp;100%公平公正公开</div>
                        <div className="footer-right-item">
                            <i className="ico ico-state-2"/>
                            &nbsp;100%正品保证</div>
                        <div className="footer-right-item">
                            <i className="ico ico-state-3"/>
                            &nbsp;100%权益保障</div>
                    </div>
                </div>
            </div>
        );
    }
}