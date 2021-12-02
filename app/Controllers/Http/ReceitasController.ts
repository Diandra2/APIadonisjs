import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Receita from 'App/Models/Receita'
import StoreReceitaValidator from 'App/Validators/StoreReceitaValidator'

export default class ReceitasController {
  public async index({}: HttpContextContract) {
    const receitasDB = await Receita.all()
    return receitasDB
  }

  public async store({request, auth}: HttpContextContract) {
    const data = await request.validate(StoreReceitaValidator)
    const receitasDB = await Receita.create({...data, userId: auth.user?.id})
    return receitasDB
  }
  public async show({ params }: HttpContextContract) {
    const receitasDB = await Receita.findOrFail(params.id)
    return receitasDB
  }

  public async update({request, params, response}: HttpContextContract) {
    const data = await request.validate(StoreReceitaValidator)
    try {
      const receitasDB = await Receita.findOrFail(params.id)
      receitasDB.receita = data.receitas
      await receitasDB.save()
      return receitasDB

    } catch (error) {
        response.status(400).send("Receita não encontrada!!")
    }
  }

  public async destroy({response, params}: HttpContextContract) {
    try {
      const receitaDB = await Receita.findOrFail(params.id)
      await receitaDB.delete()
      return receitaDB
    } catch (error) {
      response.status(400).send("Receita não encontrado!!!")
    }
  }
}
