import { useForm } from "react-hook-form"
import { joiResolver } from "@hookform/resolvers/joi"
import { useState } from "react"
import axios from "axios"

import { createPostSchema } from "../../../modules/post/post.schema"

import ControlledTextarea from "../inputs/ControlledTextArea"
import Button from "../inputs/Button"

const EditPost = ({ id, text, onSave }) => {
  const [loading, setLoading] = useState(false)
  const { control, handleSubmit, formState: {isValid} } = useForm({
    resolver: joiResolver(createPostSchema),
    mode: 'all'
  })

  const handleSaveEditPost = async (data) => {
    setLoading(true)
    try {
      const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/post`, {
        id, 
        text: data.text
      })

      if (response.status === 200) {
        onSave()
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSaveEditPost)}>
      <ControlledTextarea
              placeholder="Digite sua mensagem" 
              rows="4" 
              control={control} 
              name="text"
              maxLength="256"
              defaultValue={text}
      />
      <Button loading={loading} disabled={!isValid}>Salvar alterações</Button>
    </form>
  )
}

export default EditPost