import { createLeadService, getAllLeads, updateLeadService } from "../services/lead.service.js";






export const createLead = async (req, res) => {
    try {
        const lead = await createLeadService(req.body)
        res.status(201).json({ success: true, lead })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });

    }

}


export async function getLeads(req, res) {
    try {
        const page = req.query.page ? parseInt(req.query.page, 10) : 1;
        const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;

        const result = await getAllLeads({ page, limit });
        return res.status(200).json({ success: true, ...result });
    } catch (err) {
        const status = err.status || 500;
        const message = err.message || 'Internal server error';
        return res.status(status).json({ success: false, error: message });
    }
}




export async function updateLead(req, res) {
  try {
    const { id } = req.params;
    const updated = await updateLeadService(id, req.body);
    res.json({ success: true, lead: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}