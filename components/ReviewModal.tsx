import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { IoMdClose } from "react-icons/io"

type ModalProps = React.FC<{
  isOpen: boolean
  reviewForm: {
    username: string
    comment: string
    rating: number
  }
  handleChangeReviewForm: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmitReviewForm: () => void
  handleToggleModal: () => void
}>

const dropIn = {
  hidden: {
    y: "10vh",
    opacity: 1,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 10,
      stiffness: 500,
    },
  },
  exit: {
    y: "10vh",
    opacity: 0,
  },
}

export const ReviewModal: ModalProps = ({
  isOpen,
  reviewForm,
  handleChangeReviewForm,
  handleSubmitReviewForm,
  handleToggleModal,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          onClick={(e) => e.stopPropagation()}
          variants={dropIn}
          className="bg-[#303030] fixed left-[30%] top-[30%] transform translate-x-[-50%] translate-y-[-50%] rounded-md p-10 z-[3] max-w-[30rem] w-full"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-medium">Add a new review</h3>
            <IoMdClose
              className="text-xl cursor-pointer bg-[#484848] p-[1px] rounded-sm"
              onClick={handleToggleModal}
            >
              Close Modal
            </IoMdClose>
          </div>
          <div className="mt-6">
            <div className="flex flex-col gap-4">
              <input
                type="text"
                className="border-[1px] border-[#7e7e7e] bg-[#1D1D1D] p-2 rounded-[0.2rem] w-full outline-none"
                placeholder="Username"
                name="username"
                value={reviewForm.username}
                onChange={handleChangeReviewForm}
              />
              <input
                type="text"
                className="border-[1px] border-[#7e7e7e] bg-[#1D1D1D] p-2 rounded-[0.2rem] w-full outline-none"
                placeholder="Comment"
                name="comment"
                value={reviewForm.comment}
                onChange={handleChangeReviewForm}
              />
              <input
                type="number"
                className="border-[1px] border-[#7e7e7e] bg-[#1D1D1D] p-2 rounded-[0.2rem] w-full outline-none remove-arrow"
                placeholder="Rate 1-10"
                name="rating"
                min="1"
                max="10"
                value={reviewForm.rating}
                onChange={handleChangeReviewForm}
              />

              <button
                onClick={handleSubmitReviewForm}
                className="bg-primary py-2 rounded-[0.2rem] mt-2"
              >
                Submit
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ReviewModal
