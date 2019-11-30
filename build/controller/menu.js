"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _v = _interopRequireDefault(require("uuid/v4"));

var _index = _interopRequireDefault(require("../model/index"));

var _cloudinaryConfig = _interopRequireDefault(require("../middleware/cloudinaryConfig"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Menu =
/*#__PURE__*/
function () {
  function Menu() {
    _classCallCheck(this, Menu);
  }

  _createClass(Menu, null, [{
    key: "getAllMenu",
    value: function getAllMenu(req, res) {
      var text = "SELECT * from menu";

      _index.default.query(text).then(function (result) {
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
      }).catch(function (err) {
        return res.status(400).json(err);
      });
    }
  }, {
    key: "getSingleFood",
    value: function getSingleFood(req, res) {
      var text = "SELECT * from menu WHERE id = $1";
      var params = [req.params.id];

      _index.default.query(text, params).then(function (result) {
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
      }).catch(function (err) {
        res.status(400).json(err);
      });
    }
  }, {
    key: "addFood",
    value: function addFood(req, res) {
      var image = null;

      if (!req.file) {
        image = req.imagepath;
      } else {
        image = req.file.path;
      }

      _cloudinaryConfig.default.uploader.upload(image, function (resp) {
        var params = [(0, _v.default)(), req.body.name, req.body.price, resp.secure_url];
        var text = 'INSERT INTO menu(id, name, price, image) VALUES($1, $2, $3, $4) returning *';

        _index.default.query(text, params).then(function (result) {
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
        }).catch(function (err) {
          res.status(500).json({
            message: err
          });
        });
      });
    }
  }, {
    key: "updateFood",
    value: function updateFood(req, res) {
      var image = null;

      if (!req.file) {
        image = req.imagepath;
      } else {
        image = req.file.path;
      }

      _cloudinaryConfig.default.uploader.upload(image, function (resp) {
        var params = [req.body.name, req.body.price, resp.secure_url, req.params.id];
        var text = "UPDATE menu SET name=$1,price=$2,image=$3 WHERE id=$4";

        _index.default.query(text, params).then(function (result) {
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
        }).catch(function (err) {
          res.status(400).json({
            message: err
          });
        });
      });
    }
  }, {
    key: "deleteFood",
    value: function deleteFood(req, res) {
      var text = "DELETE from menu where id = $1";

      _index.default.query(text, [req.params.id]).then(function (result) {
        res.status(200).json({
          TYPE: 'DELETE',
          status: 200,
          message: 'Food Deleted successfully'
        });
      }).catch(function (err) {
        res.status(400).json({
          message: err
        });
      });
    }
  }]);

  return Menu;
}();

var _default = Menu;
exports.default = _default;