
import { useState } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-hot-toast"
import IconBtn from "../../../common/IconBtn"
import { createCategory } from "../../../../services/operations/categoryAPI"



export default function CreateCategoryForm() {
  const { token } = useSelector((state) => state.auth)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) {
      toast.error("Category name is required")
      return
    }

    setLoading(true)

    const result = await createCategory({ name, description }, token)

    if (result) {
      toast.success(`Category "${result.category.name}" created!`)
      setName("")
      setDescription("")
    } else {
      toast.error("Failed to create category.")
    }

    setLoading(false)
  }

  return (
    <div className="space-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 max-w-md">
      <h1 className="text-2xl font-semibold text-richblack-5">Create Category</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category Name */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="categoryName" className="text-sm text-richblack-5">
            Category Name <sup className="text-pink-200">*</sup>
          </label>
          <input
            id="categoryName"
            type="text"
            placeholder="Enter category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-style"
          />
        </div>

        {/* Category Description */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="categoryDesc" className="text-sm text-richblack-5">
            Category Description
          </label>
          <textarea
            id="categoryDesc"
            placeholder="Enter category description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-style min-h-[100px]"
          />
        </div>

        <div className="flex justify-end">
          <IconBtn disabled={loading} text="Create Category" />
        </div>
      </form>
    </div>
  )
}
