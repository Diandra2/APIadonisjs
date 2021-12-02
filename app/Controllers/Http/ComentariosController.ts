import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comentario from 'App/Models/Comentario'

export default class ProjetosController {
  public async index({ }: HttpContextContract) {
    const comentarioDB = await Comentario.all()
    return comentarioDB
  }

  public async store({ request, auth }: HttpContextContract) {
    const data = request.only(["pergunta", "resposta"])
    const comentarioDB = await Comentario.create({ ...data, userId: auth.user?.id })
    return comentarioDB
  }

  public async show({ params }: HttpContextContract) {
    const comentarioDB = await Comentario.findOrFail(params.id)
    return comentarioDB
  }

  public async update({ request, params}: HttpContextContract) {
    const comentarioDB = await Comentario.findOrFail(params.id)
    const { pergunta, resposta } = request.only(["pergunta", "resposta"])
    comentarioDB.pergunta = pergunta
    comentarioDB.resposta = resposta
    await comentarioDB.save()
    return comentarioDB

  }

  public async destroy({ params}: HttpContextContract) {
      const receitaDB = await Comentario.findOrFail(params.id)
      await receitaDB.delete()
      return receitaDB
    }
}