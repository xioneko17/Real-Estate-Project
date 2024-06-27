import { ErrorHandler } from "../utils/error.js";

/**
 * CRUD MAIN CONTROLLER where other controllers inherit or override pre-defined and existing properties
 */
export default class CoreController {
  /**
   * @param {Model} model The default model object for the controller. Will be required to create an instance of the controller
   */
  constructor(model) {
    this._model = model;
  }

  /**
   * Create a new record
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @param {function} next The callback to the next program handler
   */
  
  async createData(req, res, next) {
    try {
      const data = req.body;
      const newData = await this._model.create(data);

      if (!newData) {
        throw new ErrorHandler(error.statusCode, error.message);
      }

      newData.save();

      if (!newData) {
        throw new ErrorHandler(error.statusCode, error.message);
      }

      res.status(200).send(newData);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  /**
   * Read all records
   * @param { Object } req The request object
   * @param { Object } res The response object
   * @param { function } next The callback to the next program handler
   */
  async readAll(req, res, next) {
    try {
      const data = await this._model.find();

      if (!data) {
        throw new ErrorHandler(error.statusCode, error.message);
      }

      return data;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  /**
   * Read specific record
   * @param { Object } req The request object
   * @param { Object } res The response object
   * @param { function } next The callback to the next program handler
   * @returns
   */

  async read(req, res, next) {
    const { id } = req.params;
    try {
      const data = await this._model.findById(id);

      if (!data) {
        throw new ErrorHandler(error.statusCode, error.message);
      }

      return data;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  /**
   * Update record
   * @param { Object } req The request object
   * @param { Object } res The response object
   * @returns
   */

  async update(req, res, next) {
    const { id } = req.params;
    const { data } = req.body;

    try {
      const updateData = {};

      if (data) {
        updateData.data = data;
      }

      const newData = await this._model.findByIdAndUpdate(id, updateData, { new: true });

      return newData;
    } catch (error) {
      throw new ErrorHandler(error.status, error.message);
    }
  }

  /**
   * Delete record
   * @param { Object } req The request object
   * @param { Object } res The response object
   * @returns
   */

  async delete(req, res, next) {
    const { id } = req.params;

    try {
      const data = await this._model.delete(id);
      if (!data) {
        throw new ErrorHandler(error.statusCode, error.message);
      }
      res.status(200).json({ message: `Successfully deleted` });
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }


}

