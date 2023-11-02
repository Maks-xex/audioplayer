"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
var data_json_1 = __importDefault(require("./database/data.json"));
dotenv_1.default.config();
var app = (0, express_1.default)();
var port = process.env.PORT;
app.use((0, cors_1.default)());
app.get("/api/slides", function (_req, res) {
  res.json(data_json_1.default);
});
app.use(express_1.default.static(path_1.default.join(__dirname, "./database")));
app.listen(port, function () {
  console.log(
    "Server is running on port ".concat(
      port !== null && port !== void 0 ? port : ""
    )
  );
});
