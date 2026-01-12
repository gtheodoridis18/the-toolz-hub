import React, { useState } from 'react';
import { Sparkles, Copy } from 'lucide-react';
import { Select } from '../ui/Select';

export default function AIPromptGenerator() {
  const [taskType, setTaskType] = useState('writing');
  const [context, setContext] = useState('');
  const [prompt, setPrompt] = useState('');

  const templates = {
    writing: 'Write a comprehensive {type} about {topic}. Include {details}. Maintain a {tone} tone and make it engaging for {audience}.',
    coding: 'Create a {language} program that {functionality}. Include error handling, comments, and follow best practices. The code should be {level} level.',
    analysis: 'Analyze {subject} focusing on {aspects}. Provide insights about {specific_points}. Include data-driven conclusions and actionable recommendations.',
    creative: 'Generate creative ideas for {project}. Think outside the box and provide {number} unique concepts. Consider {constraints} and target {audience}.',
    marketing: 'Create a marketing {content_type} for {product}. Target {audience}, highlight {benefits}, include a clear call-to-action, and maintain a {tone} voice.'
  };

  const generate = () => {
    const template = templates[taskType];
    const filled = template.replace(/\{([^}]+)\}/g, (match, key) => {
      return `[${key.replace(/_/g, ' ')}]`;
    });
    setPrompt(filled + (context ? `\n\nAdditional Context: ${context}` : ''));
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(prompt);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-slate-50 rounded-2xl p-6 space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-slate-700 mb-2">Task Type</span>
          <Select
            value={taskType}
            onChange={(e) => setTaskType(e.target.value)}
          >
            <option value="writing">Content Writing</option>
            <option value="coding">Programming</option>
            <option value="analysis">Data Analysis</option>
            <option value="creative">Creative Brainstorming</option>
            <option value="marketing">Marketing Copy</option>
          </Select>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700 mb-2">Additional Context (Optional)</span>
          <textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="Add any specific requirements or context..."
            className="min-h-[100px] w-full text-base leading-relaxed resize-none rounded-xl border border-slate-200 p-4 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
          />
        </label>

        <button
          onClick={generate}
          className="w-full h-12 rounded-xl bg-teal-600 text-white hover:bg-teal-700 transition-colors font-medium flex items-center justify-center gap-2"
        >
          <Sparkles className="w-5 h-5" />
          Generate AI Prompt
        </button>
      </div>

      {prompt && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Generated Prompt</h3>
            <button
              onClick={copyPrompt}
              className="h-10 px-4 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <Copy className="w-4 h-4" />
              Copy
            </button>
          </div>

          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-slate-700 leading-relaxed whitespace-pre-wrap font-mono text-sm">{prompt}</p>
          </div>

          <p className="text-xs text-slate-500">
            Tip: Fill in the [bracketed sections] with your specific requirements when using this prompt with AI tools.
          </p>
        </div>
      )}

      <div className="border-t border-slate-100 pt-4 mt-6">
        <p className="text-xs text-slate-500 text-center">
          🔒 Privacy: Prompt generation is performed locally. the Toolific Hub does not collect, store, or transmit your prompts or context.
        </p>
      </div>
    </div>
  );
}
