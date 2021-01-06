import React, { Component, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Menu from '../../components/Menu'
import { Document, Page, pdfjs } from 'react-pdf';
import Axios from 'axios';
import url from '../../global'
import { Divider, Spin } from 'antd';
import { useParams } from 'react-router-dom'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ID = () => {
    const [numPages, setNumPages] = useState(1);
    const [pdf, setPdf] = useState('')
    const [loading, setLoading] = useState(true)

    var onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    }
    const router = useRouter()
    // console.log(router.query);
    // const { id } = useParams()
    useEffect(() => {
        Axios.post(url + '/doc/get/' + window.location.href.split('/').pop()).then(response => {
            setPdf(response.data)
            setLoading(false)
        })
    }, [])

    return (
        <>
            <Menu name={pdf == '' ? '' : pdf._source.title} />
            <center>
                {
                    loading ? <Spin /> : <Document
                        file={'data:application/pdf;base64,' + pdf._source.content}
                        onLoadSuccess={onDocumentLoadSuccess}
                    >
                        {
                            Array.from(
                                new Array(numPages), (e, i) => (<><Page scale={1.6} renderTextLayer={true}
                                    pageNumber={i + 1} key={i}
                                /><Divider/></>)
                            )
                        }

                    </Document>
                }

            </center>
        </>
    )
}

export default ID;
