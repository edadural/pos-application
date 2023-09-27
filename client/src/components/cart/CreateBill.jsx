import { Modal } from "antd"

const CreateBill = ({isModalOpen, setIsModalOpen}) => {
    return (
        <div>
            <Modal title="Fatura Oluştur" open={isModalOpen} footer={false} onCancel={() => setIsModalOpen(false)}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </div>
    )
}

export default CreateBill
