import { Modal } from "antd"

const PrintBill = ({ isModalOpen, setIsModalOpen }) => {

    return (
        <div>
            <Modal
                title="Fatura Yazdır"
                open={isModalOpen}
                footer={false}
                onCancel={() => setIsModalOpen(false)}
            >
                Fatura
            </Modal>
        </div>
    )
}

export default PrintBill
