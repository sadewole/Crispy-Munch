import uuidv4 from 'uuid/v4';
import db from '../model/index';
import cloudinary from '../middleware/cloudinaryConfig';

class Menu {
	static getAllMenu(req, res) {
		const text = `SELECT * from menu`;

		db
			.query(text)
			.then((result) => {
				if (result.rows.length < 1) {
					return res.status(200).json({
						message: 'Menu is empty'
					});
				}
				return res.status(200).json({
					TYPE: 'GET',
					status: 200,
					count: result.rows.length,
					message: 'List of foods in cart',
					data: result.rows
				});
			})
			.catch((err) => {
				return res.status(400).json(err);
			});
	}

	static getSingleFood(req, res) {
		const text = `SELECT * from menu WHERE id = $1`;
		const params = [ req.params.id ];

		db
			.query(text, params)
			.then((result) => {
				if (!result.rows.length) {
					return res.status(404).json({
						message: 'Not Found'
					});
				}
				return res.status(200).json({
					TYPE: 'GET',
					status: 200,
					message: 'Request successful',
					data: result.rows[0]
				});
			})
			.catch((err) => {
				res.status(400).json(err);
			});
	}

	static addFood(req, res) {
		let image = null;
		if (!req.file) {
			image = req.imagepath;
		} else {
			image = req.file.path;
		}

		cloudinary.uploader.upload(image, (resp) => {
			const params = [ uuidv4(), req.body.name, req.body.price, resp.secure_url ];
			const text = 'INSERT INTO menu(id, name, price, image) VALUES($1, $2, $3, $4) returning *';
			db
				.query(text, params)
				.then((result) => {
					res.status(201).json({
						TYPE: 'POST',
						status: 201,
						data: {
							name: req.body.name,
							price: req.body.price,
							image: resp.secure_url
						},
						message: 'Food added successfully'
					});
				})
				.catch((err) => {
					res.status(500).json({
						message: err
					});
				});
		});
	}

	static updateFood(req, res) {
		let image = null;
		if (!req.file) {
			image = req.imagepath;
		} else {
			image = req.file.path;
		}

		cloudinary.uploader.upload(image, (resp) => {
			const params = [ req.body.name, req.body.price, resp.secure_url, req.params.id ];
			const text = `UPDATE menu SET name=$1,price=$2,image=$3 WHERE id=$4`;

			db
				.query(text, params)
				.then((result) => {
					res.status(201).json({
						TYPE: 'PUT',
						status: 201,
						data: {
							name: req.body.name,
							price: req.body.price,
							image: resp.secure_url
						},
						message: 'Food updated successfully'
					});
				})
				.catch((err) => {
					res.status(400).json({
						message: err
					});
				});
		});
	}

	static deleteFood(req, res) {
		const text = `DELETE from menu where id = $1`;

		db
			.query(text, [ req.params.id ])
			.then((result) => {
				res.status(200).json({
					TYPE: 'DELETE',
					status: 200,
					message: 'Food Deleted successfully'
				});
			})
			.catch((err) => {
				res.status(400).json({
					message: err
				});
			});
	}
}

export default Menu;
