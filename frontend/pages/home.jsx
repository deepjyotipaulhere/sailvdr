import { FileOutlined, FilePdfFilled, FilePdfTwoTone, FolderOutlined } from '@ant-design/icons'
import { Card, Col, Grid, List, Progress, Row, Spin, Layout } from 'antd'
import Axios from 'axios'
import React, { Component, useEffect, useState } from 'react'
import Menu from '../components/Menu'
import url from '../global'
import Link from 'next/link'

const home = () => {
    const [files, setFiles] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        Axios.post(url + "/doc/get").then(response => {
            setFiles(response.data)
            setLoading(false)
        })
    }, [])
    return (
        <div>
            <Menu />
            {
                !loading ?
                    <div>
                        <h4 style={{ textAlign: 'center' }}>{files.hits.length} files</h4>
                        <List
                            bordered
                            dataSource={files.hits}
                            itemLayout="horizontal"
                            renderItem={item => (
                                <Link href={"/view/" + item._id} key={item._id}>
                                    <List.Item>

                                        <a style={{ color: 'navy', }}>
                                            {item._source.title}
                                        </a>
                                    </List.Item>
                                </Link>
                            )}
                        />
                    </div>
                    :
                    <center><Spin /></center>
            }

        </div>
    )
}

export default home;