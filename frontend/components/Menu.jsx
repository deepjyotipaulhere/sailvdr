import { ArrowLeftOutlined, PoweroffOutlined } from '@ant-design/icons'
import { Button, PageHeader } from 'antd'
import Search from 'antd/lib/input/Search'
import React, { Component } from 'react'

export default class Menu extends Component {
    render() {
        return (
            <div>
                <PageHeader
                    className=""
                    title="VDR" subTitle={this.props.name||'HOME'} backIcon={<ArrowLeftOutlined/>}
                    extra={[
                        // <Search />,
                        <Button type="danger" icon={<PoweroffOutlined />} size={15} />]}
                />
            </div>
        )
    }
}
