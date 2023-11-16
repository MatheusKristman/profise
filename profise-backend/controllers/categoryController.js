const Category = require("../models/Category.js");

const createCategory = async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);

    return res.status(200).json(newCategory);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Ocorreu um erro inesperado", error });
  }
};

async function getAllCategories(req, res) {
  try {
    const categories = await Category.find();

    if (!categories) {
      return res.status(404).json({ message: "Não foram encontradas categorias" });
    }

    return res.status(200).json(categories);
  } catch (error) {
    console.log(error);

    return res.status(400).json({ message: "Ocorreu um erro ao solicitar as categorias", error });
  }
}

async function getSearchedCategory(req, res) {
  const { search } = req.query;

  console.log("search", search);

  try {
    if (!search) {
      return res.status(404).json({ message: "Não foram encontradas categorias" });
    }

    const categories = await Category.find();

    if (!categories) {
      return res.status(404).json({ message: "Não foram encontradas categorias" });
    }

    function filterSubCategory(subCategory, query, idSelected, results) {
      if (
        subCategory.slug
          .toLowerCase()
          .replaceAll("-", " ")
          .includes(
            query
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, ""),
          )
      ) {
        return {
          slugSelected: subCategory.slug,
          idSelected,
        };
      }

      if (subCategory.subCategory && subCategory.subCategory.length > 0) {
        for (const sub of subCategory.subCategory) {
          const subResult = filterSubCategory(sub, query, idSelected, results);

          if (subResult) {
            return subResult;
          }
        }
      }

      return null;
    }

    function filterCategory(category, query, results = []) {
      for (const cat of category) {
        console.log(cat.slug);
        if (
          cat.slug
            .toLowerCase()
            .replaceAll("-", " ")
            .includes(
              query
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, ""),
            )
        ) {
          results.push({
            slugSelected: cat.slug,
            idSelected: cat._id,
          });
          break;
        }

        for (const sub of cat.subCategory) {
          const subResults = filterSubCategory(sub, query, cat._id, results);

          if (subResults) {
            results.push(subResults);
            break;
          }
        }
      }

      return results;
    }

    const results = filterCategory(categories, search);

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "Não foram encontradas categorias de acordo com a busca realizada" });
    }

    return res.status(200).json(results);
  } catch (error) {
    console.log(error);

    return res.status(400).json({ message: "Ocorreu um erro ao pesquisar as categorias", error });
  }
}

async function findSelectedCategory(req, res) {
  const { id } = req.body;

  if (!id) {
    return res.status(406).json({ message: "Id não providenciado" });
  }

  try {
    const categorySelected = await Category.findById(id);

    if (!categorySelected) {
      return res.status(404).json({ message: "Categoria não encontrada" });
    }

    return res.status(200).json(categorySelected);
  } catch (error) {
    console.log(error);

    return res.status(400).json({ message: "Ocorreu um erro ao resgatar categoria", error });
  }
}

module.exports = {
  createCategory,
  getAllCategories,
  getSearchedCategory,
  findSelectedCategory,
};
