import React, { Component } from 'react';
import Bookmark from './bookmark.component';

import { Modal } from 'antd';

class GroupBookmark extends Component {
    currentGroupId = -1;
    constructor(props) {
        super();

        this.state = {
            visibleModalDel: false,
            currentId: undefined
        }
    }



    showModal = (id) => {
        this.setState({
            visibleModalDel: true,
            currentId: id,
        })
    }

    handleOk = () => {

        const remainData = this.props.data;
        const result = remainData[this.currentGroupId].bookmarks.filter(item => item.id !== this.state.currentId);
        remainData[this.currentGroupId].bookmarks = result;
        this.setState({
            visibleModalDel: false,
            data: remainData
        })
        console.log(this.props.data, 'data sau khi thay doi')
    }

    render() {
        const { visibleModalDel } = this.state;
        const { data } = this.props;

        return (
            <React.Fragment>
                <div className="row">
                    {
                        data.map((item, index) => (
                            <div key={index} className="col-6">
                                <h3> {item.name} </h3>
                                {
                                    item.bookmarks.map(({ links, title, id }, indexChild) => (
                                        <React.Fragment key={indexChild}>
                                            <Bookmark title={title} links={links} showModal={() => {
                                                this.currentGroupId = index
                                                console.log(index, 'index');
                                                console.log(id, 'id');
                                                this.showModal(id)
                                            }} />
                                        </React.Fragment>
                                    ))
                                }

                            </div>
                        ))
                    }
                </div>
                <Modal
                    visible={visibleModalDel}
                    onOk={() => this.handleOk()}
                    onCancel={() => this.setState({
                        visibleModalDel: false,
                    })}
                    title="Delete Bookmark"
                >
                    <p> Bạn có chắc chắn muốn xóa bookmark ?</p>
                </Modal>
            </React.Fragment>
        );
    }
}

export default GroupBookmark;

